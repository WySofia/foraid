import React, { useState } from 'react';
import { CalendarIcon, MapPinIcon, UserIcon, EditIcon } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Simulación de datos de la base de datos
const casosMock = [
    {
        id_caso: 1,
        fecha: new Date('2023-05-15'),
        titulo: 'Robo en residencia',
        descripcion:
            'Robo a mano armada en una residencia del sector norte. Los perpetradores ingresaron por una ventana trasera y sustrajeron objetos de valor. Se reportan dos sospechosos, ambos de aproximadamente 1.80m de altura.',
        tipoCaso: { nombre: 'Robo' },
        calle_principal: 'Av. Principal',
        calle_secundaria: 'Calle 5',
        provincia: 'Pichincha',
        canton: 'Quito',
        usuario: { nombre: 'Juan', apellido: 'Pérez' },
        ultimoIdentikit: {
            imagen: '/placeholder.svg',
            fecha_creacion: new Date('2023-05-20'),
        },
    },
    {
        id_caso: 2,
        fecha: new Date('2023-06-20'),
        titulo: 'Desaparición',
        descripcion:
            'Persona desaparecida hace 48 horas en el centro de la ciudad. Última vez vista en la intersección de la Calle Central y Av. Libertad. Vestía jeans azules y una camiseta roja. Se solicita cualquier información que pueda ayudar a su localización.',
        tipoCaso: { nombre: 'Desaparición' },
        calle_principal: 'Calle Central',
        calle_secundaria: 'Av. Libertad',
        provincia: 'Guayas',
        canton: 'Guayaquil',
        usuario: { nombre: 'María', apellido: 'López' },
        ultimoIdentikit: {
            imagen: '/placeholder.svg',
            fecha_creacion: new Date('2023-06-22'),
        },
    },
    {
        id_caso: 3,
        fecha: new Date('2023-07-05'),
        titulo: 'Fraude bancario',
        descripcion:
            'Múltiples reportes de transacciones fraudulentas en cuentas bancarias. Los afectados reportan cargos no autorizados realizados en línea. Se sospecha de una red organizada de cibercriminales. Se está trabajando en conjunto con las entidades bancarias para rastrear el origen de las transacciones.',
        tipoCaso: { nombre: 'Fraude' },
        provincia: 'Azuay',
        canton: 'Cuenca',
        usuario: { nombre: 'Carlos', apellido: 'Rodríguez' },
        ultimoIdentikit: {
            imagen: '/placeholder.svg',
            fecha_creacion: new Date('2023-07-10'),
        },
    },
];

export default function GalleryCasoPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [casoSeleccionado, setCasoSeleccionado] = useState(null);

    const handleEdit = (id) => {
        // Aquí iría la lógica para navegar a la página de edición del caso
        // eslint-disable-next-line no-console
        console.log(`Editando caso ${id}`);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Galería de Casos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {casosMock.map((caso) => (
                    <Card key={caso.id_caso} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{caso.titulo}</CardTitle>
                            <CardDescription>
                                <Badge variant="secondary">
                                    {caso.tipoCaso.nombre}
                                </Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-2">
                                {caso.descripcion.substring(0, 100)}...
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {caso.fecha.toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <MapPinIcon className="mr-2 h-4 w-4" />
                                {caso.canton}, {caso.provincia}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <UserIcon className="mr-2 h-4 w-4" />
                                {caso.usuario.nombre} {caso.usuario.apellido}
                            </div>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setCasoSeleccionado(caso)
                                            }
                                        >
                                            Ver detalles
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[700px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {caso.titulo}
                                            </DialogTitle>
                                            <DialogDescription>
                                                Detalles del caso #
                                                {caso.id_caso}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4 flex flex-col md:flex-row gap-4">
                                            <div className="md:w-1/3">
                                                <img
                                                    src={
                                                        caso.ultimoIdentikit
                                                            .imagen
                                                    }
                                                    alt="Último identikit"
                                                    width={300}
                                                    height={300}
                                                    className="rounded-md"
                                                />
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Último identikit:{' '}
                                                    {caso.ultimoIdentikit.fecha_creacion.toLocaleDateString()}
                                                </p>
                                            </div>
                                            <ScrollArea className="md:w-2/3 h-[300px] rounded-md border p-4">
                                                <p className="mb-2">
                                                    <strong>Fecha:</strong>{' '}
                                                    {caso.fecha.toLocaleDateString()}
                                                </p>
                                                <p className="mb-2">
                                                    <strong>
                                                        Tipo de caso:
                                                    </strong>{' '}
                                                    {caso.tipoCaso.nombre}
                                                </p>
                                                <p className="mb-2">
                                                    <strong>
                                                        Descripción:
                                                    </strong>{' '}
                                                    {caso.descripcion}
                                                </p>
                                                <p className="mb-2">
                                                    <strong>Ubicación:</strong>{' '}
                                                    {caso.calle_principal} y{' '}
                                                    {caso.calle_secundaria},{' '}
                                                    {caso.canton},{' '}
                                                    {caso.provincia}
                                                </p>
                                                <p className="mb-2">
                                                    <strong>
                                                        Reportado por:
                                                    </strong>{' '}
                                                    {caso.usuario.nombre}{' '}
                                                    {caso.usuario.apellido}
                                                </p>
                                            </ScrollArea>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleEdit(caso.id_caso)}
                                >
                                    <EditIcon className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
