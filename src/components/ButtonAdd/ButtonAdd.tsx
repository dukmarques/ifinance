import Styles from './ButtonAdd.module.scss';
import plusImage from "../../../public/assets/icons/plus-small.svg";
import Image from 'next/image';

type ButtonAddProps = {
    onClick: () => void;
    alt?: string;
}

export default function ButtonAdd({ onClick, alt }: ButtonAddProps) {
    return (
        <button className={Styles.buttonAdd} onClick={onClick}>
            <Image src={plusImage} width='12' height='12' alt={alt} />
        </button>
    )
}