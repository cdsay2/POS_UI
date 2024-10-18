import React from 'react';
import { BarChart, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard icon={<Users />} title="Usuarios" value="150" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard icon={<ShoppingBag />} title="Productos" value="1,234" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard icon={<DollarSign />} title="Ventas Hoy" value="$5,678" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard icon={<BarChart />} title="Ingresos Mensuales" value="$123,456" />
        </Grid>
      </Grid>
    </div>
  );
};

const DashboardCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        {icon}
      </CardContent>
    </Card>
  );
};

export default Dashboard;