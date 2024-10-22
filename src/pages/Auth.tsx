import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('login');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
        },
    };

    const switchVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full max-w-[400px] sm:max-w-[500px]"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                    <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={switchVariants}
                    >
                        {activeTab === 'login' ? (
                            <TabsContent value="login">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Iniciar Sesión</CardTitle>
                                        <CardDescription>
                                            Ingresa tus credenciales para
                                            acceder a tu cuenta.
                                        </CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handleSubmit}>
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <CardContent className="space-y-4">
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="space-y-1"
                                                >
                                                    <Label htmlFor="email">
                                                        Correo Electrónico
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="m@ejemplo.com"
                                                        required
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="space-y-1"
                                                >
                                                    <Label htmlFor="password">
                                                        Contraseña
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        required
                                                    />
                                                </motion.div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={isLoading}
                                                >
                                                    <AnimatePresence mode="wait">
                                                        <motion.span
                                                            key={
                                                                isLoading
                                                                    ? 'loading'
                                                                    : 'idle'
                                                            }
                                                            initial={{
                                                                opacity: 0,
                                                                y: 20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: -20,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                        >
                                                            {isLoading
                                                                ? 'Iniciando sesión...'
                                                                : 'Iniciar Sesión'}
                                                        </motion.span>
                                                    </AnimatePresence>
                                                </Button>
                                            </CardFooter>
                                        </motion.div>
                                    </form>
                                </Card>
                            </TabsContent>
                        ) : null}
                        {activeTab === 'register' ? (
                            <TabsContent value="register">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Registrarse</CardTitle>
                                        <CardDescription>
                                            Crea una cuenta para comenzar.
                                        </CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handleSubmit}>
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <CardContent className="space-y-4">
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="grid grid-cols-2 gap-4"
                                                >
                                                    <div className="space-y-1">
                                                        <Label htmlFor="nombre">
                                                            Nombre
                                                        </Label>
                                                        <Input
                                                            id="nombre"
                                                            placeholder="Juan"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label htmlFor="apellido">
                                                            Apellido
                                                        </Label>
                                                        <Input
                                                            id="apellido"
                                                            placeholder="Pérez"
                                                            required
                                                        />
                                                    </div>
                                                </motion.div>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="space-y-1"
                                                >
                                                    <Label htmlFor="correo">
                                                        Correo Electrónico
                                                    </Label>
                                                    <Input
                                                        id="correo"
                                                        type="email"
                                                        placeholder="m@ejemplo.com"
                                                        required
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="space-y-1"
                                                >
                                                    <Label htmlFor="contrasenia">
                                                        Contraseña
                                                    </Label>
                                                    <Input
                                                        id="contrasenia"
                                                        type="password"
                                                        required
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="space-y-1"
                                                >
                                                    <Label htmlFor="cargo">
                                                        Cargo
                                                    </Label>
                                                    <Input
                                                        id="cargo"
                                                        placeholder="Desarrollador"
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="space-y-1"
                                                >
                                                    <Label htmlFor="rango">
                                                        Rango
                                                    </Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecciona un rango" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="junior">
                                                                Junior
                                                            </SelectItem>
                                                            <SelectItem value="mid">
                                                                Intermedio
                                                            </SelectItem>
                                                            <SelectItem value="senior">
                                                                Senior
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </motion.div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={isLoading}
                                                >
                                                    <AnimatePresence mode="wait">
                                                        <motion.span
                                                            key={
                                                                isLoading
                                                                    ? 'loading'
                                                                    : 'idle'
                                                            }
                                                            initial={{
                                                                opacity: 0,
                                                                y: 20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: -20,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                        >
                                                            {isLoading
                                                                ? 'Creando cuenta...'
                                                                : 'Crear Cuenta'}
                                                        </motion.span>
                                                    </AnimatePresence>
                                                </Button>
                                            </CardFooter>
                                        </motion.div>
                                    </form>
                                </Card>
                            </TabsContent>
                        ) : null}
                    </motion.div>
                </AnimatePresence>
            </Tabs>
        </div>
    );
}
