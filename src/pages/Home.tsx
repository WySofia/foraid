import { useState } from 'react';
import { motion } from 'framer-motion';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userName, setUserName] = useState('Oficial Rodríguez');

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
        },
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
            <div className="w-full max-w-4xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="mb-8 text-center"
                >
                    <h1 className="text-3xl font-semibold">
                        Bienvenido, {userName}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Sistema de gestión de identikits forenses
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={cardVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Crear Identikit</CardTitle>
                                <CardDescription>
                                    Genera un nuevo identikit basándote en la
                                    descripción de un testigo.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full mt-4">Iniciar</Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={cardVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Gestión de Identikits</CardTitle>
                                <CardDescription>
                                    Visualiza y administra los identikits
                                    generados previamente.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full mt-4">
                                    Gestionar
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={cardVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Emparejamiento de Modelos</CardTitle>
                                <CardDescription>
                                    Busca coincidencias entre los identikits
                                    generados y rostros reales.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full mt-4">
                                    Buscar Coincidencias
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={cardVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuración</CardTitle>
                                <CardDescription>
                                    Personaliza las opciones del sistema y
                                    ajusta tu cuenta.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full mt-4">Ajustes</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
