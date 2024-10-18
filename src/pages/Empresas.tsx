import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Typography, Box } from '@mui/material';

interface Empresa {
  id: number;
  nombre: string;
  ruc: string;
  direccion: string;
}

const Empresas: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([
    { id: 1, nombre: "Empresa A", ruc: "20123456789", direccion: "Av. Principal 123" },
    { id: 2, nombre: "Empresa B", ruc: "20987654321", direccion: "Jr. Secundario 456" },
  ]);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddEmpresa = (empresa: Omit<Empresa, 'id'>) => {
    const newEmpresa = { ...empresa, id: Date.now() };
    setEmpresas([...empresas, newEmpresa]);
    setShowForm(false);
  };

  const handleEditEmpresa = (empresa: Empresa) => {
    setEmpresas(empresas.map(e => e.id === empresa.id ? empresa : e));
    setEditingEmpresa(null);
  };

  const handleDeleteEmpresa = (id: number) => {
    setEmpresas(empresas.filter(e => e.id !== id));
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Empresas</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => setShowForm(true)}
          size="small"
        >
          Agregar Empresa
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empresas.map(empresa => (
              <TableRow key={empresa.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Building2 size={16} style={{ marginRight: '8px' }} />
                    {empresa.nombre}
                  </Box>
                </TableCell>
                <TableCell>{empresa.ruc}</TableCell>
                <TableCell>{empresa.direccion}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit size={16} />}
                    onClick={() => setEditingEmpresa(empresa)}
                    sx={{ mr: 1 }}
                    size="small"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Trash2 size={16} />}
                    onClick={() => handleDeleteEmpresa(empresa.id)}
                    size="small"
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={showForm || !!editingEmpresa}
        onClose={() => {
          setShowForm(false);
          setEditingEmpresa(null);
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <EmpresaForm
            empresa={editingEmpresa || undefined}
            onSubmit={editingEmpresa ? handleEditEmpresa : handleAddEmpresa}
            onCancel={() => {
              setShowForm(false);
              setEditingEmpresa(null);
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

interface EmpresaFormProps {
  empresa?: Empresa;
  onSubmit: (empresa: Empresa | Omit<Empresa, 'id'>) => void;
  onCancel: () => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresa, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(empresa || { nombre: '', ruc: '', direccion: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 2 }}>{empresa ? 'Editar' : 'Agregar'} Empresa</Typography>
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        fullWidth
        sx={{ mb: 2 }}
        size="small"
      />
      <TextField
        label="RUC"
        name="ruc"
        value={formData.ruc}
        onChange={handleChange}
        required
        fullWidth
        sx={{ mb: 2 }}
        size="small"
      />
      <TextField
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        required
        fullWidth
        sx={{ mb: 2 }}
        size="small"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined" sx={{ mr: 1 }} size="small">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" size="small">
          {empresa ? 'Actualizar' : 'Agregar'}
        </Button>
      </Box>
    </form>
  );
};

export default Empresas;