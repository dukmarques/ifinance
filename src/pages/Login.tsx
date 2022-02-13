import '../styles/login.scss';
import ilustrationImg from '../assets/login/ilustration.svg';
import googleIcon from '../assets/login/google-icon.svg';
import accessIcon from '../assets/login/access-icon.svg';
import logoImg from '../assets/logo.svg';

export function Login() {
    return (
        <main>
            <div className="apresentation">
                <img src={ilustrationImg} alt="Ilustração de Apresentação" />
                <div className="text">
                    <h2>Organize suas finanças</h2>
                    <p>Fácil e intuítivo, com o iFinance você se organiza e mantém o controle financeiro!</p>
                </div>
            </div>
            <div className="login">
                <div className="content">
                    <img src={logoImg} alt="Logo iFinance" />
                    <button>
                        <img src={googleIcon} alt="Logo Google" />
                        <span>Faça login com o Google</span>
                    </button>
                    <div className="separator">ou via e-mail</div>
                    <form>
                        <input type="email" placeholder='E-mail' />
                        <input type="password" placeholder='Senha' />
                        <button type="submit">
                            <img src={accessIcon} alt="ícone de criar conta" />
                            <span>Acessar</span>
                        </button>
                        <span>Registre-se</span>
                    </form>
                </div>
            </div>
        </main>
    );
}