import Styles from './Header.module.scss';

type HeaderProps = {
    title: String,
    subtitle?: String,
    description?: String
}

export default function Header(props: HeaderProps) {
    return (
        <div className={Styles.container}>
            <h1>{props.title}</h1>
            <p> {props.subtitle} </p>
            <span>{props.description}</span>
        </div>
    )
}