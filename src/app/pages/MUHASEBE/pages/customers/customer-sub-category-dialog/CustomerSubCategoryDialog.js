import React, {  useMemo,useEffect ,useState} from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/customers/customersActions";
import { useCustomersUIContext } from "../CustomersUIContext";
import {ModalProgressBar,Input,Select} from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";
import { Formik,  Field } from "formik";

export function CustomerSubCategoryDialog({ show, onHide }) {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
    };
  }, [customersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.customers }),
    shallowEqual
  );

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customers.actionsLoading }),
    shallowEqual
  );
  


  const {categories} = currentState
const [init,setInit] = useState(null)

  useEffect(() => {
      if(show)
      {
        dispatch(actions.fetchCategories());
        setInit({
            title : "",
            categoryId : "1",

        })
      }
   
   
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show ]);



  const intl = useIntl()

  const addSubCategory= (values) => {
    // server request for deleting customer by selected ids
    dispatch(actions.addCustomerSubCategory(values)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(customersUIProps.queryParams)).then(
        () => {
          // clear selections list
          customersUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (


    <Formik
    enableReinitialize={true}
    initialValues={init}
    onSubmit={(values,{resetForm}) => {
     

        if(values.title !== "")
      {
        addSubCategory(values);
        resetForm();
      
      }

    }}
  >
    {({ handleSubmit}) => (

    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
        {intl.formatMessage({ id: "MENU.ADD.CATEGORY" })}
      
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Select name="categoryId" label="Kategoriler">
        {
            categories &&
            categories.map((item,index)=>{
                return(
                <option key = {index} value = {item.id}>{item.title}</option>
                )
            })
            
        }
    </Select>
      <Field
        name="title"
        component={Input}
        placeholder="Ad"
        label="Alt Kategori Adı"
         />


      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
           {intl.formatMessage({ id: "MENU.CANCEL" })} 
          </button>
          <> </>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn-elevate"
          >
       {intl.formatMessage({ id: "MENU.ADD" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
    )}
      </Formik>
  );
}

