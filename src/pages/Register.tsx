import { Link } from 'react-router-dom';

import ilustrationImg from '../assets/auth/ilustration.svg';
import googleIcon from '../assets/auth/google-icon.svg';
import logoImg from '../assets/logo.svg';
import registerIcon from '../assets/auth/register-icon.svg';
import '../styles/auth.scss';

export function Register() {
    return (
        <main>
            <div className="apresentation">
                <img src={ilustrationImg} alt="Ilustração de Apresentação" />
                <div className="text">
                    <h2>Tenha o controle financeiro na palma das suas mãos</h2>
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
                        <label htmlFor="userphoto">
                            Selecione uma Foto
                            <input type="file" />
                        </label>
                        <input type="email" placeholder='E-mail' />
                        <input type="password" placeholder='Senha' />
                        <button type="submit">
                            <img src={registerIcon} alt="ícone de criar conta" />
                            <span>Criar Conta</span>
                        </button>
                        <Link to="/login">
                            <span>Acessar</span>
                        </Link>
                    </form>
                </div>
            </div>
        </main>
    )
}