import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    identificacion: Yup.string().required('Requerido'),
    password: Yup.string().min(4, 'Mínimo 4 caracteres').required('Requerido'),
  });

  const irRegsiter = () => {
    navigate('/register')
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl text-white mb-6 text-center">Ingresar</h2>
        <Formik
          initialValues={{ identificacion: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log(values);           
            navigate('/table');
            // Aquí manejarás el submit
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-white">Indentificacion</label>
                <Field
                  name="identificacion"
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
                {errors.identificacion && touched.identificacion ? <div className="text-red-500">{errors.identificacion}</div> : null}
              </div>
              <div>
                <label htmlFor="password" className="block text-white">Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
                {errors.password && touched.password ? <div className="text-red-500">{errors.password}</div> : null}
              </div>
              <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Entrar</button>
              <button onClick={ irRegsiter } className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Regsitrar</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
