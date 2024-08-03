import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Atleta from '@/pages/Atleta/Atleta';
import CadastroPerfil from '@/pages/CadastroPerfil/CadastroPerfil';
import CadastroPerfilForm from '@/pages/CadastroPerfil/CadastroPerfilForm';
import CadastroCategoria from '@/pages/CadastroCategoria/CadastroCategoria';
import CadastroCategoriaForm from '@/pages/CadastroCategoria/CadastroCategoriaForm';
import ChamadaTipo from '@/pages/ChamadaTipo/ChamadaTipo';
import ChamadaTipoForm from '@/pages/ChamadaTipo/ChamadaTipoForm';
import CadastroAdvertencia from '@/pages/CadastroAdvertencia/CadastroAdvertencia';
import CadastroAdvertenciaForm from '@/pages/CadastroAdvertencia/CadastroAdvertenciaForm';
import AtletaMenu from '@/pages/Atleta/AtletaMenu';
import AtletaList from '@/pages/Atleta/AtletaList';
import AtletaForm from '@/pages/Atleta/AtletaForm';
import CadastroUsuario from '@/pages/Usuarios/CadastroUsuario';
import CadastroUsuarioForm from '@/pages/Usuarios/CadastroUsuarioForm';
import ResponsavelList from '@/pages/Responsavel/ResponsavelList';
import ResponsavelForm from '@/pages/Responsavel/ResponsavelForm';
import Chamada from '@/pages/Chamada/Chamada';
import ChamadaForm from '@/pages/Chamada/ChamadaForm';
import Presencas from '@/pages/Presencas/Presencas';
import PresencasView from '@/pages/Presencas/PresencasView';
import AtletaView from '@/pages/AtletaView/AtletaView';
import AtletaViewEdit from '@/pages/AtletaView/AtletaViewEdit';
import ResponsavelView from '@/pages/ResponsavelView/ResponsavelView';
import ResponsavelViewEdit from '@/pages/ResponsavelView/ResponsavelViewEdit';
import ResponsavelListView from '@/pages/ResponsavelView/ResponsavelListView';
import Frequencia from '@/pages/Frequencia/Frequencia';
import Advertencias from '@/pages/Advertencias/Advertencias';
import Ajuda from '@/pages/Ajuda/index';
import MainPages from '@/ui/partials/mainPages';

export default function MyRoute(){
    return(
        <Routes>
            <Route path="/" element={<Login />}>
            </Route>
            <Route Component={MainPages}>
                <Route path="/home" Component={Home} />
                <Route path="/cadastroPerfil" Component={CadastroPerfil} />
                <Route path="/cadastroPerfilForm/:id" Component={CadastroPerfilForm} />
                <Route path="/cadastroCategoria" Component={CadastroCategoria} />
                <Route path="/cadastroCategoriaForm/:id" Component={CadastroCategoriaForm} />
                <Route path="/cadastroChamadaTipo" Component={ChamadaTipo} />
                <Route path="/cadastroChamadaTipoForm/:id" Component={ChamadaTipoForm} />
                <Route path="/cadastroAdvertenciaTipo" Component={CadastroAdvertencia} />
                <Route path="/cadastroAdvertenciaTipoForm/:id" Component={CadastroAdvertenciaForm} />
                <Route path="/atleta/:id" Component={Atleta} />
                <Route path="/atletaForm/:id/:categoria_id" Component={AtletaForm} />
                <Route path="/atletaMenu" Component={AtletaMenu} />
                <Route path="/atletaList/:id" Component={AtletaList} />
                <Route path="/usuarios/" Component={CadastroUsuario} />
                <Route path="/usuarioForm/:id" Component={CadastroUsuarioForm} />
                <Route path="/responsaveis/" Component={ResponsavelList} />
                <Route path="/responsaveisForm/:id" Component={ResponsavelForm} />
                <Route path="/chamadas/" Component={Chamada} />
                <Route path="/chamadasForm/:id" Component={ChamadaForm} />
                <Route path="/presencas/:id" Component={Presencas} />
                <Route path="/presencasView/:id" Component={PresencasView} />
                <Route path="/atletaview/:id" Component={AtletaView} />
                <Route path="/atletaviewedit/:id" Component={AtletaViewEdit} />
                <Route path="/responsavellistview/" Component={ResponsavelListView} />
                <Route path="/responsavelview/:id" Component={ResponsavelView} />
                <Route path="/responsavelviewedit/:id" Component={ResponsavelViewEdit} />
                <Route path="/frequencia/:id" Component={Frequencia} />
                <Route path="/advertencias/:id" Component={Advertencias} />
                <Route path="/ajuda" Component={Ajuda} />
            </Route>
        </Routes>
    )
}