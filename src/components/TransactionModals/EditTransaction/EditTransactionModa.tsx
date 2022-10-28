import { useEffect, useState } from "react";
import { edit } from "../../../services/transaction";
import { Card } from "../../../Types/Card";
import { Category } from "../../../Types/Category";
import { Transaction, UpdateTransaction } from "../../../Types/Transaction";
import { User } from "../../../Types/User";
import { notifyError, notifySuccess } from "../../../util/notifyToast";
import { Modal } from "../../Modal/Modal";

import Styles from '../Styles.module.scss';

type EditTransactionProps = {
    cards: Card[];
    categories: Category[];
    modalEdit: boolean;
    transactionEdit: Transaction | undefined;
    closeModal: () => void;
    getTransactions: () => void;
}

export function EditTransactionModal({ cards, categories, transactionEdit, modalEdit, closeModal, getTransactions }: EditTransactionProps) {
    const [nameTransaction, setNameTransaction] = useState<string>('');
    const [priceTransaction, setPriceTransaction] = useState<number>(0);
    const [typeTransaction, setTypeTransaction] = useState<string>('EXIT');
    const [paidOutTransaction, setPaidOutTransaction] = useState<boolean>(false);
    const [dateTransaction, setDateTransaction] = useState<string>('');
    const [cardTransaction, setCardTransaction] = useState<number>();
    const [categoryTransaction, setCategoryTransaction] = useState<number>();
    const [ownerTransaction, setOwnerTransaction] = useState<string>('MY');

    useEffect(() => {
        setNameTransaction(transactionEdit?.title!);
        setPriceTransaction(parseFloat(transactionEdit?.price.toString()!));
        setTypeTransaction(transactionEdit?.type!);
        setPaidOutTransaction(transactionEdit?.paidOut!);
        setDateTransaction(transactionEdit?.date.toString()!);
        setCardTransaction(transactionEdit?.Card?.id);
        setCategoryTransaction(transactionEdit?.Category?.id);
        setOwnerTransaction(transactionEdit?.owner!);
    }, [transactionEdit])


    async function handlerEditTransaction(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let transaction: UpdateTransaction = {
            id: transactionEdit?.id!,
            title: nameTransaction,
            price: priceTransaction,
            type: typeTransaction,
            paidOut: paidOutTransaction,
            date: dateTransaction,
            owner: ownerTransaction,
            category: categoryTransaction,
            card: cardTransaction
        }

        const res: Transaction = await edit(transaction);

        if (res) {
            notifySuccess(`Transação ${res.title} editada com sucesso!`);
            getTransactions();
            cleanInputsForm();
            closeModal();
        } else {
            notifyError('Erro ao editar transação.');
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
            openModal={modalEdit}
            closeModal={closeModal}
            classOverlay={Styles.Overlay}
            classModal={Styles.modal}
        >
            <form onSubmit={handlerEditTransaction}>
                <h3>Editar Transação <strong>{nameTransaction}</strong></h3>
                <input type="text" placeholder="Nome" value={nameTransaction} onChange={(e) => setNameTransaction(e.target.value)} />

                <label htmlFor="price">Valor</label>
                <input type="number" id="price" min="0" step="any" value={priceTransaction} onChange={(e) => setPriceTransaction(parseFloat(e.target.value))} />

                <label htmlFor="type">É uma entrada ou saída?</label>
                <select id="type" onChange={(e) => setTypeTransaction(e.target.value)}>
                    <option value="EXIT" selected={typeTransaction === 'EXIT'} >Saída</option>
                    <option value="ENTRY" selected={typeTransaction === 'ENTRY'}>Entrada</option>
                </select>

                {typeTransaction === 'EXIT'
                    ? (
                        <>
                            <label htmlFor="paidOut">Transação já paga?</label>
                            <select id="paidOut" onChange={(e) => setPaidOutTransaction(e.target.value === 'true' ? true : false)}>
                                <option value="false" selected={paidOutTransaction === false}>Não</option>
                                <option value="true" selected={paidOutTransaction === true}>Sim</option>
                            </select>
                        </>
                    ) : null
                }

                <label htmlFor="">Data da Transação</label>
                <input
                    type="date"
                    onChange={(e) => setDateTransaction(e.target.value)}
                />

                {typeTransaction === 'EXIT'
                    ? <>
                        <label htmlFor="card">Cartão</label>
                        <select id="card" onChange={(e) => setCardTransaction(parseInt(e.target.value))}>
                            <option value="">Selecione o Cartão</option>
                            {cards.map((item) => (
                                <option key={item.id} value={item.id} selected={cardTransaction === item.id} >{item.name}</option>
                            ))}
                        </select>
                    </>
                    : null
                }

                <label htmlFor="category">Categoria</label>
                <select id="category" onChange={(e) => setCategoryTransaction(parseInt(e.target.value))}>
                    <option value="" selected>Selecione a Categoria</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id} selected={categoryTransaction === item.id} >{item.name}</option>
                    ))}
                </select>

                {typeTransaction === 'EXIT'
                    ? <>
                        <label htmlFor="owner">Pertence a você?</label>
                        <select id="owner" onChange={(e) => setOwnerTransaction(e.target.value)}>
                            <option value="MY" selected={ownerTransaction === 'MY'} >Sim</option>
                            <option value="OTHER" selected={ownerTransaction === 'OTHER'} >Não</option>
                        </select>
                    </>
                    : null
                }

                <button type="submit">Editar</button>
            </form>
        </Modal>
    )
}