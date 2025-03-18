import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, CheckSquare, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        {/* Hero section */}
        <div className="relative overflow-hidden">
          
          <div className="max-w-7xl mx-auto">
            
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
              
              <div className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="text-center lg:text-left">
      
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            

                  <div className="flex col-1 justify-center">
           </div>  
                    <span className="block tracking-wide leading-relaxed">Organiza tu trabajo con </span>  
                          <img src="/src/assets/images/Grupo 3.png" alt="Logo" className="h-50 w-50"/>   
                    
                    <span className="block text-indigo-500 dark:text-indigo-400">de manera visual</span>
                  </h1>
                  <p className="mt-3 tracking-wide text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Gestiona proyectos, organiza tareas y construye colaboración en equipo - todo en una herramienta visual.
                  </p>
   
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/register"
                        className="w-md flex items-center justify-center px-8 py-3 border border-2 text-base font-small rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Comenzar gratis
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/login"
                        className="w flex items-center justify-center px-8 py-3 border-2 text-base font-small rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Iniciar sesión
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>


     

          </div>  
        </div>

        {/* Feature section */}
        <div className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                Características
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Una mejor manera de trabajar
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Layout className="h-6 w-6" />
                  </div>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Tableros visuales
                  </p>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Organiza tu trabajo en tableros visuales intuitivos y flexibles.
                  </p>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <CheckSquare className="h-6 w-6" />
                  </div>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Gestión de tareas
                  </p>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Crea, asigna y realiza seguimiento de tareas de manera eficiente.
                  </p>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Seguro y confiable
                  </p>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    Tus datos están seguros y disponibles cuando los necesites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}