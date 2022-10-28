import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import { CreateTransaction, Transaction } from "../../../Types/Transaction";
import { notifyError, notifySuccess } from "../../../util/notifyToast";
import { register } from "../../../services/transaction";
import { User } from "../../../Types/User";

import Styles from '../Styles.module.scss';
import { Card } from "../../../Types/Card";
import { Category } from "../../../Types/Category";

type CreateTransactionProps = {
    userData: User;
    cards: Card[];
    categories: Category[];
    modalIsOpen: boolean;
    closeModal: () => void;
    getTransactions: () => void;
}

export default function CreateTransactionModal({ userData, cards, categories, modalIsOpen, closeModal, getTransactions }: CreateTransactionProps) {
    const [nameTransaction, setNameTransaction] = useState<string>('');
    const [priceTransaction, setPriceTransaction] = useState<number>(0);
    const [typeTransaction, setTypeTransaction] = useState<string>('EXIT');
    const [paidOutTransaction, setPaidOutTransaction] = useState<boolean>(false);
    const [dateTransaction, setDateTransaction] = useState<string>('');
    const [cardTransaction, setCardTransaction] = useState<number>();
    const [categoryTransaction, setCategoryTransaction] = useState<number>();
    const [ownerTransaction, setOwnerTransaction] = useState<string>('MY');

    async function handlerCreateTransaction(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (nameTransaction === '' || priceTransaction === 0 || dateTransaction === '') {
            notifyError('Existem campos não preenchidos.');
        } else {
            let transaction: CreateTransaction = {
                title: nameTransaction,
                price: priceTransaction,
                type: typeTransaction,
                paidOut: paidOutTransaction,
                date: dateTransaction,
                owner: ownerTransaction,
                category: categoryTransaction!,
                card: cardTransaction!
            }

            const res: Transaction = await register(userData?.id!, transaction);

            if (res) {
                notifySuccess(`Transação ${res.title} cadastrada com sucesso!`);
                getTransactions();
                cleanInputsForm();
                closeModal();
            } else {
                notifyError('Erro ao cadastrar transação.');
            }
        }
    }

    function cleanInputsForm() {
        setNameTransaction('');
        setPriceTransaction(0);
        setTypeTransaction('EXIT');
        setPaidOutTransaction(false);
        setDateTransaction('');
        setCardTransaction(0);
        setCategoryTransaction(0);
        setOwnerTransaction('MY');
    }

    return (
        <Modal
            openModal={modalIsOpen}
            closeModal={closeModal}
            classOverlay={Styles.Overlay}
            classModal={Styles.modal}
        >
            <form onSubmit={handlerCreateTransaction}>
                <h3>Cadastrar Transação</h3>
                <input type="text" placeholder="Nome" value={nameTransaction} onChange={(e) => setNameTransaction(e.target.value)} />

                <label htmlFor="price">Valor</label>
                <input type="number" id="price" min="0" step="any" value={priceTransaction} onChange={(e) => setPriceTransaction(parseFloat(e.target.value))} />

                <label htmlFor="type">É uma entrada ou saída?</label>
                <select id="type" onChange={(e) => setTypeTransaction(e.target.value)}>
                    <option value="EXIT" selected>Saída</option>
                    <option value="ENTRY">Entrada</option>
                </select>

                {typeTransaction === 'EXIT'
                    ? (
                        <>
                            <label htmlFor="paidOut">Transação já paga?</label>
                            <select id="paidOut" onChange={(e) => setPaidOutTransaction(e.target.value === 'true' ? true : false)}>
                                <option value="false" selected>Não</option>
                                <option value="true">Sim</option>
                            </select>
                        </>
                    ) : null
                }


                <label htmlFor="">Data da Transação</label>
                <input type="date" onChange={(e) => setDateTransaction(e.target.value)} />

                {typeTransaction === 'EXIT'
                    ? <>
                        <label htmlFor="card">Cartão</label>
                        <select id="card" onChange={(e) => setCardTransaction(parseInt(e.target.value))}>
                            <option value="" selected>Selecione o Cartão</option>
                            {cards.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </>
                    : null
                }

                <label htmlFor="category">Categoria</label>
                <select id="category" onChange={(e) => setCategoryTransaction(parseInt(e.target.value))}>
                    <option value="" selected>Selecione a Categoria</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>

                {typeTransaction === 'EXIT'
                    ? <>
                        <label htmlFor="owner">Pertence a você?</label>
                        <select id="owner" onChange={(e) => setOwnerTransaction(e.target.value)}>
                            <option value="MY" selected>Sim</option>
                            <option value="OTHER">Não</option>
                        </select>
                    </>
                    : null
                }

                <button type="submit">Cadastrar</button>
            </form>
        </Modal>
    )
}