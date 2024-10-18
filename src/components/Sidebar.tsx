import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Drawer, List, ListItem, ListItemIcon, ListItemText, 
  IconButton, Paper, Collapse
} from '@mui/material';
import { 
  Home, Business, People, ShoppingCart, AttachMoney, 
  Inventory, ChevronLeft, ChevronRight, ExpandLess, ExpandMore
} from '@mui/icons-material';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  text: string;
  path: string;
  subItems?: { text: string; path: string }[];
}

interface PopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomPopover: React.FC<PopoverProps> = ({ anchorEl, onClose, children }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorEl && popoverRef.current) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 5,
      });
    }
  }, [anchorEl]);

  if (!anchorEl) return null;

  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
    >
      <Paper elevation={3}>
        {children}
      </Paper>
    </div>,
    document.body
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, itemText: string) => {
    if (!isOpen || isMobile) {
      setAnchorEl(event.currentTarget);
      setOpenMenuItem(itemText);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenMenuItem(null);
  };

  const toggleExpand = (itemText: string) => {
    setExpandedItems(prev =>
      prev.includes(itemText)
        ? prev.filter(item => item !== itemText)
        : [...prev, itemText]
    );
  };

  const menuItems: MenuItem[] = [
    { 
      icon: Home, 
      text: 'Dashboard', 
      path: '/',
      subItems: [
        { text: 'Resumen General', path: '/dashboard/resumen' },
        { text: 'Estadísticas', path: '/dashboard/estadisticas' },
        { text: 'Reportes', path: '/dashboard/reportes' },
      ]
    },
    { 
      icon: Business, 
      text: 'Empresas', 
      path: '/empresas',
      subItems: [
        { text: 'Lista de Empresas', path: '/empresas' },
        { text: 'Configurar Empresa', path: '/empresas/configurar' },
        { text: 'Sucursales', path: '/empresas/sucursales' },
      ]
    },
    {
      icon: People,
      text: 'Usuarios',
      path: '/usuarios',
      subItems: [
        { text: 'Lista de Usuarios', path: '/usuarios' },
        { text: 'Roles', path: '/usuarios/roles' },
        { text: 'Permisos', path: '/usuarios/permisos' },
      ]
    },
    {
      icon: Inventory,
      text: 'Productos',
      path: '/productos',
      subItems: [
        { text: 'Catálogo', path: '/productos' },
        { text: 'Categorías', path: '/productos/categorias' },
        { text: 'Inventario', path: '/productos/inventario' },
      ]
    },
    {
      icon: AttachMoney,
      text: 'Ventas',
      path: '/ventas',
      subItems: [
        { text: 'Nueva Venta', path: '/ventas/nueva' },
        { text: 'Historial de Ventas', path: '/ventas/historial' },
        { text: 'Reportes de Ventas', path: '/ventas/reportes' },
      ]
    },
    {
      icon: ShoppingCart,
      text: 'Compras',
      path: '/compras',
      subItems: [
        { text: 'Nueva Compra', path: '/compras/nueva' },
        { text: 'Historial de Compras', path: '/compras/historial' },
        { text: 'Proveedores', path: '/compras/proveedores' },
      ]
    },
  ];

return (
    <>
      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: isOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 60,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '8px' }}>
          <IconButton onClick={toggleSidebar}>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem 
                button 
                component={Link} 
                to={item.path}
                onClick={() => isOpen && item.subItems && toggleExpand(item.text)}
                onMouseEnter={(e) => handlePopoverOpen(e, item.text)}
                onMouseLeave={handlePopoverClose}
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                {isOpen && (
                  <>
                    <ListItemText primary={item.text} />
                    {item.subItems && (
                      expandedItems.includes(item.text) ? <ExpandLess /> : <ExpandMore />
                    )}
                  </>
                )}
              </ListItem>
              {isOpen && item.subItems && (
                <Collapse in={expandedItems.includes(item.text)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        component={Link}
                        to={subItem.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <CustomPopover
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      >
        <List>
          {openMenuItem && menuItems.find(item => item.text === openMenuItem)?.subItems?.map((subItem, subIndex) => (
            <ListItem
              button
              key={subIndex}
              component={Link}
              to={subItem.path}
              onClick={handlePopoverClose}
            >
              <ListItemText primary={subItem.text} />
            </ListItem>
          ))}
        </List>
      </CustomPopover>
    </>
  );
};

export default Sidebar;