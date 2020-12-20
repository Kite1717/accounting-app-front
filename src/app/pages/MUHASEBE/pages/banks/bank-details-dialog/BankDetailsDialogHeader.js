import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function BankDetailsDialogHeader({ id }) {
    // Banks Redux state
    const { bankForEdit, actionsLoading } = useSelector(
        (state) => ({
            bankForEdit: state.banks.bankForEdit,
            actionsLoading: state.banks.actionsLoading,
        }),
        shallowEqual
    );

    const [title, setTitle] = useState("");
    const [currentBank, setCurrentBank] = useState({})
    // Title couting
    useEffect(() => {
        let _title = id ? "" : "Yeni Banka";
        if (bankForEdit && id) {
            console.log(bankForEdit.bank)
            setCurrentBank(bankForEdit.bank)
            _title = `${bankForEdit.bank.bankCaseAccountName}`;
        }
        setTitle(_title);
        // eslint-disable-next-line
    }, [bankForEdit, actionsLoading]);

    return (
        <>
            {actionsLoading && <ModalProgressBar />}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
                <br />
                <span>
                    Döviz Cinsi : {currentBank.currencyType}
                </span>
                <br />
                {
                    currentBank.accountNumber !== "" &&
                    <>
                    <span>
                        Hesap Numarası : {currentBank.accountNumber}
                    </span>
                    <br />
                    </>
                }
                {
                    currentBank.iban !== "" &&
                    <span>
                        İBAN : {currentBank.iban}
                    </span>
                }
            </Modal.Header>
        </>
    );
}