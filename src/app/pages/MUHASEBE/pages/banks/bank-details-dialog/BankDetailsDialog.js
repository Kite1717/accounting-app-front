import React, { useEffect, useMemo } from "react";
import { Modal, ModalBody, Tabs, Tab } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/banksActions";
import { useBanksUIContext } from "../BanksUIContext";
import ModalHeader from "react-bootstrap/ModalHeader";
import { BankDetailsDialogHeader } from "./BankDetailsDialogHeader";
import { LastTransactionsTable } from "./bank-details-tabs/LastTransacionsTable";
import { AddMoneyEntry } from "./bank-details-tabs/AddMoneyEntry";
import { AddMoneyOut } from "./bank-details-tabs/AddMoneyOut";
import { TransferAnotherAccount } from "./bank-details-tabs/TransferAnotherAccount";

export function BankDetailsDialog({ id, show, onHide }) {
    // Banks UI Context
    const banksUIContext = useBanksUIContext();
    const banksUIProps = useMemo(() => {
        return {
            initBank: banksUIContext.initBank,
        };
    }, [banksUIContext]);

    // Banks Redux state
    const dispatch = useDispatch();
    const { actionsLoading, bankForEdit } = useSelector(
        (state) => ({
            actionsLoading: state.banks.actionsLoading,
            bankForEdit: state.banks.bankForEdit,
        }),
        shallowEqual
    );

    useEffect(() => {
        // server call for getting Bank by id
        dispatch(actions.fetchBank(id));
    }, [id, dispatch]);

    // server request for saving bank
    const saveBank = (bank) => {
        if (!id) {
            // server request for creating bank
            dispatch(actions.createBank(bank)).then(() => onHide());
        } else {
            // server request for updating bank
            dispatch(actions.updateBank(bank)).then(() => onHide());
        }
    };

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <BankDetailsDialogHeader id={id} />
            <ModalBody>
                <Tabs defaultActiveKey="lastTransactions">
                    <Tab eventKey="lastTransactions" title="Son Yapılan İşlemler">
                        <LastTransactionsTable/>
                    </Tab>
                    <Tab eventKey="addMoneyEntry" title="Para Girişi Ekle">
                        <AddMoneyEntry onHide={onHide}/>
                    </Tab>
                    <Tab eventKey="addMoneyOut" title="Para Çıkışı Ekle">
                        <AddMoneyOut onHide={onHide} />
                    </Tab>
                    <Tab eventKey="transfer" title="Diğer Hesaba Transfer Yap">
                        <TransferAnotherAccount onHide={onHide} />
                    </Tab>
                </Tabs>
            </ModalBody>
        </Modal>
    );
}
