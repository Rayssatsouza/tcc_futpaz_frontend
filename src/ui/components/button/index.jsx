import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
export const FutmanagerButton = ({ icon, className, color, click }) => {
    return (
        <Button className={`w-32 m-3 ${className}`}
            style={{ width: '120px' }}
            variant="contained"
            color={color}
            onClick={click}>
            {icon}
        </Button>
    )
}