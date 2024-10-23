import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon, FileTextIcon, MapPinIcon } from 'lucide-react';
import { format } from 'date-fns';

import Navbar from '../components/Navbar';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    id_usuario: z.number().int().positive().optional(),
    fecha: z.date(),
    titulo: z.string().min(1, 'El título es requerido'),
    descripcion: z.string().optional(),
    id_tipo_caso: z.number().int().positive(),
    calle_principal: z.string().optional(),
    calle_secundaria: z.string().optional(),
    provincia: z.string().optional(),
    canton: z.string().optional(),
});

export default function CreateCasoPage() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id_usuario: 1, // Esto debería establecerse dinámicamente según el usuario conectado
            fecha: new Date(),
            titulo: '',
            descripcion: '',
            id_tipo_caso: 1, // Esto debería poblarse con las opciones de TipoCaso disponibles
            calle_principal: '',
            calle_secundaria: '',
            provincia: '',
            canton: '',
        },
    });

    // values: z.infer<typeof formSchema>
    function onSubmit() {
        // Aquí normalmente enviarías los datos a tu backend
        toast({
            title: 'Caso creado con éxito',
            description: 'El nuevo caso ha sido registrado en el sistema.',
        });
        // Después de la presentación exitosa, podrías redirigir
        // navigate('/casos')
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 max-w-3xl">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">
                            Crear Nuevo Caso
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="titulo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Título</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Título del caso"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fecha"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Fecha</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={
                                                                    'outline'
                                                                }
                                                                className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                                                            >
                                                                {field.value ? (
                                                                    format(
                                                                        field.value,
                                                                        'PPP'
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        Seleccionar
                                                                        fecha
                                                                    </span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                            disabled={(date) =>
                                                                date >
                                                                    new Date() ||
                                                                date <
                                                                    new Date(
                                                                        '1900-01-01'
                                                                    )
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="descripcion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descripción del caso"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="id_tipo_caso"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de Caso</FormLabel>
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(
                                                        parseInt(value)
                                                    )
                                                }
                                                defaultValue={field.value.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar tipo de caso" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">
                                                        Tipo 1
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        Tipo 2
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        Tipo 3
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center">
                                        <MapPinIcon className="mr-2" />
                                        Ubicación
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="calle_principal"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Calle Principal
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Calle principal"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="calle_secundaria"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Calle Secundaria
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Calle secundaria"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="provincia"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Provincia
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Provincia"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="canton"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Cantón
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Cantón"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between pt-6">
                                    <Button
                                        type="submit"
                                        className="w-full mr-4"
                                    >
                                        <FileTextIcon className="mr-2 h-4 w-4" />{' '}
                                        Crear Caso
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() =>
                                            navigate('/create-identikit')
                                        }
                                    >
                                        Crear Identikit
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
