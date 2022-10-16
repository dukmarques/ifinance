import Image from 'next/image';
import Styles from './Styles.module.scss';

import CloseButton from '../../../public/assets/icons/close-button.svg';

type ModalProps = {
    children: React.ReactNode;
    openModal: boolean;
    closeModal: () => void;
    classModal: string;
    classOverlay: string;
}

export function Modal({ children, openModal, closeModal, classModal, classOverlay }: ModalProps) {
    return (
        <div className={Styles.container}>
            {openModal &&
                <>
                    <div
                        className={classOverlay ?? Styles.overlay}
                        style={{ zIndex: 99 }}
                        onClick={closeModal}
                    >
                        <div
                            className={classModal ?? Styles.modal}
                            style={{ zIndex: 100, position: 'relative' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}

                            <button className={Styles.buttonClose} onClick={closeModal}>
                                <Image src={CloseButton} width='40' height='40' alt="Fechar modal" />
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}