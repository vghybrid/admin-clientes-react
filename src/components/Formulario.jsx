import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = () => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
      nombre: Yup.string()
                  .max(20, 'El nombre es muy largo')
                  .required('El nombre del cliente es obligatorio'),
      empresa: Yup.string()
                  .required('El nombre de la empresa es obligatorio'),
      email: Yup.string()
                .email('Email no válido')
                .required('El email es obligatorio'),
      telefono: Yup.number()
                  .positive('Número no válido')
                  .integer('Número no válido')
                  .typeError('Número no válido')
    })

  const handleSubmit = async (valores) => {
    try {
        const url = 'http://localhost:4000/clientes'

        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        console.log(respuesta)
        const resultado = await respuesta.json()
        console.log(resultado)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='md:w-3/4 mx-auto mt-10 px-5 py-10 rounded-md shadow-md bg-white '>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar Cliente</h1>

        <Formik 
            initialValues={{
              nombre: '',
              empresa: '',
              email: '',
              telefono: '',
              notas: ''
            }}
            onSubmit={ async (values, {resetForm}) => {
                await handleSubmit(values)
                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        >
          {({errors, touched}) => {
              return (
            <Form
              className="mt-10"
            >
              <div className="mb-4">
                <label 
                  className="text-gray-800"
                  htmlFor="nombre"
                >Nombre:</label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 p-3 block w-full bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) :  null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800"
                  htmlFor="empresa"
                >Empresa:</label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 p-3 block w-full bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) :  null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800"
                  htmlFor="email"
                >E-mail:</label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 p-3 block w-full bg-gray-50"
                  placeholder="E-mail del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) :  null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800"
                  htmlFor="telefono"
                >Teléfono:</label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 p-3 block w-full bg-gray-50"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) :  null}
              </div>

              <div className="mb-4">
                <label 
                  className="text-gray-800"
                  htmlFor="notas"
                >Notas:</label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 p-3 block w-full bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>

              <input
                  type="submit"
                  value="Agregar Cliente"
                  className="mt-5 p-3 w-full bg-blue-800 text-white uppercase font-bold text-lg"
              />
            </Form>
          )}}           
        </Formik>
    </div>
  )
}

export default Formulario