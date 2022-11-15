import {useState,useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
  const [nombre,setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email,setEmail] = useState('');
  const [fecha,setFecha] = useState('');
  const [sintomas,setSintomas] = useState('');

  const [error,setError] = useState(false);

  useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  },[paciente])


  const reiniciarFormulario = () => {
    //reiniciar form.
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del Formulario.
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      setError (true);
    }
    else
    {
      //objeto de paciente

      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,        
      }
    
      if(paciente.id){
        objetoPaciente.id = paciente.id;
        
        const pacienteActualizado = pacientes.map( (pacienteState) => {
          return (pacienteState.id === paciente.id) ? objetoPaciente : pacienteState;
        } );

        setPacientes(pacienteActualizado);
        setPaciente({});

      }else
      {
        //Nuevo registro.
        objetoPaciente.id = generarId();
        setPacientes([...pacientes,objetoPaciente]);
      }

      setError(false);

      reiniciarFormulario();
      
    }

    console.log('Enviando Formulario');
  };

  return (
    <>
    <div className="md:w-1/2 lg:w-2/5 mx-5">      
        <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
            Añade paciente y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" 
            onSubmit={handleSubmit}>

        {error && <Error><p>Todos los cambpos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="mascota" 
                 className="block text-gray-700 uppercase font-bold">Nombre Mascota 
          </label>
          <input id="mascota" 
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                 type="text" 
                 placeholder="Nombre de la mascota" 
                 value={nombre} 
                 onChange={ (e) => setNombre(e.target.value)} 
          />          
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input id="propietario" 
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                 type="text" 
                 placeholder="Nombre del propietario"
                 value={propietario} 
                 onChange={ (e) => setPropietario(e.target.value)} 
          />          
        </div>        
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input id="email" 
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                 type="email" 
                 placeholder="Email contacto propietario"
                 value={email} 
                 onChange={ (e) => setEmail(e.target.value)} 
          />          
        </div>        
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input id="alta" 
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                 type="date"
                 value={fecha} 
                 onChange={ (e) => setFecha(e.target.value)} 
          />          
        </div>        
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea id="sintomas" 
                    className="border-2 w-full p-2 mt-2" 
                    placeholder="Describe los Sintomas" 
                    value={sintomas} 
                    onChange={ (e) => setSintomas(e.target.value)} 
                    >
          </textarea>
        </div>         
        <input type="submit" 
               className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
               value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
    </>    
  )
}

export default Formulario

