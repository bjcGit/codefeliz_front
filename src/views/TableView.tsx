import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAxios from "../hooks/useAxios";

const TableView = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const axios = useAxios();

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await axios.get("/codes/user-codes");
      setCodes(response.data.codes);
    } catch (error) {
      console.error("Error al obtener los códigos:", error);
      setErrorMessage("No se pudo obtener la lista de códigos, verifique su sesión.");
    }
  };

  const addCode = async (values: { code: string }) => {
    try {
      const response = await axios.post("/codes/claim", { code: values.code });
      console.log(response.data)
      if (response.data.success) { 
        await fetchCodes(); // Llamar a fetchCodes para obtener la lista actualizada desde la base de datos
        setErrorMessage("");
        alert(response.data.msg);
      } else {
        setErrorMessage("No se pudo guardar el código en la base de datos.");
      }
    } catch (error: any) {
      console.error("Error al agregar el código:", error);
      const backendMessage =
        error.response?.data?.msg || "Error al procesar el código";
      setErrorMessage(backendMessage);
    }
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .matches(/^\d{4}$/, "El código debe tener exactamente 4 dígitos numéricos.")
      .test(
        "range",
        "El código debe estar entre 0000 y 0999",
        (value) => {
          const numberValue = parseInt(value || "", 10);
          return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 999;
        }
      )
      .required("El código es obligatorio")
  });

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl mb-4">Lista de Códigos</h1>
      <Formik
        initialValues={{ code: "" }}
        validationSchema={validationSchema}
        onSubmit={addCode}
      >
        {({ errors, touched }) => (
          <Form className="flex mb-4">
            <Field
              name="code"
              type="text"
              className="p-2 bg-gray-800 text-white rounded-l"
              placeholder="Ingrese un código"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r"
            >
              Agregar
            </button>
            {errors.code && touched.code ? (
              <div className="text-red-500 ml-2">{errors.code}</div>
            ) : null}
          </Form>
        )}
      </Formik>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <table className="w-full table-auto bg-gray-800 rounded">
        <thead>
          <tr>
            <th className="p-2">Código</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="p-2">{code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
