import Logo from "../LoginPage/Logo";
import NavbarItens from "./NavbarItens";
import { Stack } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { getUser } from '@/data/services/storage';

// eslint-disable-next-line react/prop-types
export const Navbar = ({ isVisible }) => {
  const user = getUser();
  const perfil = user.perfil_id;

  const itens = [
    { titulo: 'Home', icone: <HomeIcon />, caminho: '/home', visivel: true },
    { titulo: 'Atletas', icone: <BadgeIcon />, caminho: '/atletaMenu', visivel: perfil == 1 || perfil == 3 },
    { titulo: 'Responsáveis', icone: <EscalatorWarningIcon />, caminho: '/responsaveis', visivel: perfil == 1 || perfil == 3 },
    { titulo: 'Chamadas', icone: <ChecklistIcon />, caminho: '/chamadas', visivel: perfil == 1 || perfil == 3 },
    {
      titulo: "Gerencial", icone: <SettingsIcon />, submenu: [
        { titulo: "Perfis", icone: <ManageAccountsIcon />, caminho: '/cadastroPerfil', visivel: perfil == 1 || perfil == 3 },
        { titulo: "Categorias", icone: <ContentPasteSearchIcon />, caminho: '/cadastroCategoria', visivel: perfil == 1 || perfil == 3 },
        { titulo: "Chamadas", icone: <AssignmentIcon />, caminho: '/cadastroChamadaTipo', visivel: perfil == 1 || perfil == 3 },
        { titulo: "Advertências", icone: <WarningAmberIcon />, caminho: '/cadastroAdvertenciaTipo', visivel: perfil == 1 || perfil == 3 },
        { titulo: "Usuários", icone: <GroupIcon />, caminho: '/usuarios', visivel: perfil == 1 || perfil == 3 }
      ]
    },
    { titulo: 'Ajuda', icone: <HelpIcon />, caminho: (perfil == 1 || perfil == 3) ? '/ajuda' : '/ajuda#atleta', visivel: true },
    { titulo: 'Minhas informações', icone: <AccountBoxIcon />, caminho: '/atletaview/' + user.atleta_id, visivel: (perfil == 4 || perfil == 5) },
    { titulo: 'Meus responsáveis', icone: <EscalatorWarningIcon />, caminho: '/responsavellistview', visivel: (perfil == 4 || perfil == 5) },
    { titulo: 'Frequência', icone: <ViewTimelineIcon />, caminho: '/frequencia/' + user.atleta_id, visivel: (perfil == 4 || perfil == 5) },
    { titulo: 'Advertências', icone: <WarningAmberIcon />, caminho: '/advertencias/' + user.atleta_id, visivel: (perfil == 4 || perfil == 5) }
  ];

  return (
    <aside className="flex">
      <div className={`bg-blue-fut-paz ${isVisible ? "w-72" : "w-20"} duration-300 relative shadow-md`}>
        <div className={`${isVisible ? "pl-12" : "p-1"}`}>
          <Logo />
        </div>
        <h3 className="ml-5 mb-5 font-bold text-white">Menu</h3>
        <div className="m-2">
          <nav>
            <Stack component="ul"
              spacing={0.5}
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0
              }}>
              {itens.map((item, index) => (
                <NavbarItens item={item} key={index} isVisible={isVisible} />
              ))}
            </Stack>
          </nav>
        </div>
      </div>
    </aside>
  );
}
