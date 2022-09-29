import Styles from './Styles.module.scss';

interface Props {
    children: React.ReactNode;
    openModal: boolean;
    closeModal: () => void;
    classModal: string;
    classOverlay: string;
}

export function Modal({ children, openModal, closeModal, classModal, classOverlay }: Props) {
    return (
        <div className={Styles.container}>
            {openModal &&
                <div
                    className={classOverlay ?? Styles.overlay}
                    style={{ zIndex: 99 }}
                    onClick={closeModal}
                >
                    <div
                        className={classModal ?? Styles.modal}
                        style={{ zIndex: 100 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            }
        </div>
    )
}