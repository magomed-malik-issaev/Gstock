import { useState } from 'react';
import {
  Container,
  Title,
  Button,
  Modal,
  TextInput,
  PasswordInput,
  Select,
  Group,
  Box,
  Alert
} from '@mantine/core';
import { IconPlus, IconCheck, IconX } from '@tabler/icons-react';
import api from '../services/api';
import axios from 'axios';

const roles = [
  { value: 'employee', label: 'Employé' },
  { value: 'manager', label: 'Responsable' },
  { value: 'admin', label: 'Admin' }
];

export default function UsersPage() {
  const [opened, setOpened] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validation simple côté front
  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.role) {
      setError('Tous les champs sont obligatoires.');
      return false;
    }
    if (form.password.length < 8 || !/[0-9]/.test(form.password) || !/[A-Za-z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, des lettres, des chiffres et un symbole.');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return false;
    }
    return true;
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      // Première requête pour obtenir le token CSRF
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      // Requête pour créer l'utilisateur
      const response = await api.post('/users', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      setSuccess('Utilisateur créé avec succès !');
      setForm({ name: '', email: '', password: '', confirmPassword: '', role: '' });
      setOpened(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création.');
    }
    setLoading(false);
  };

  return (
    <Container size="md">
      <Group position="apart" mb="lg">
        <Title order={2}>Utilisateurs</Title>
        <Button leftIcon={<IconPlus size={18} />} onClick={() => setOpened(true)}>
          Créer un utilisateur
        </Button>
      </Group>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Créer un utilisateur" centered>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nom complet"
            placeholder="Jean Dupont"
            required
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="jean.dupont@email.com"
            type="email"
            required
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            mt="md"
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Motdepasse123!"
            required
            value={form.password}
            onChange={e => handleChange('password', e.target.value)}
            mt="md"
          />
          <PasswordInput
            label="Confirmation du mot de passe"
            placeholder="Motdepasse123!"
            required
            value={form.confirmPassword}
            onChange={e => handleChange('confirmPassword', e.target.value)}
            mt="md"
          />
          <Select
            label="Rôle"
            placeholder="Choisir un rôle"
            data={roles}
            required
            value={form.role}
            onChange={value => handleChange('role', value)}
            mt="md"
          />
          {error && <Alert color="red" icon={<IconX />} mt="md">{error}</Alert>}
          {success && <Alert color="green" icon={<IconCheck />} mt="md">{success}</Alert>}
          <Group position="right" mt="xl">
            <Button type="submit" loading={loading}>
              Créer
            </Button>
          </Group>
        </form>
      </Modal>
      {/* Liste des utilisateurs à afficher ici plus tard */}
      <Box mt="xl">
        <Alert color="blue">La liste des utilisateurs sera affichée ici.</Alert>
      </Box>
    </Container>
  );
}
