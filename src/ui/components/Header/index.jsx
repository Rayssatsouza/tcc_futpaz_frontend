import { Badge, IconButton } from "@mui/material"
import User from "../Header/User"
import MenuIcon from '@mui/icons-material/Menu';


// eslint-disable-next-line react/prop-types
export default function Header({ onClick }) {
  return (
    <header className=" bg-white h-16 w-full shadow-md flex justify-between">
      <div className="p-3">
        <IconButton aria-label="Abrir menu" onClick={onClick}>
          <Badge>
            <MenuIcon className="text-red-400" />
          </Badge>
        </IconButton>
      </div>
      <div className="p-3 flex flex-row">
        <User />
      </div>
    </header>
  )
}