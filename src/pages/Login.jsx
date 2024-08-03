import LoginPage from "@/ui/components/LoginPage";
import { BackgroundSoccer, BlackBackground } from "@/ui/styles/Styles";


export default function Login(){
    return(
       <BackgroundSoccer>
        <BlackBackground>
        <LoginPage/>
        </BlackBackground>
       </BackgroundSoccer>
    )
}