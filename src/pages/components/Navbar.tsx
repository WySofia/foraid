import { Link, useLocation } from 'react-router-dom';
import { FolderOpen, User, FileText, Search, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
    const location = useLocation();

    const routes = [
        {
            to: '/casos',
            label: 'Casos',
            icon: FolderOpen,
        },
        {
            to: '/identikits',
            label: 'Identikits',
            icon: FileText,
        },
    ];

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72">
                        <nav className="flex flex-col space-y-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.to}
                                    to={route.to}
                                    className={cn(
                                        'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                                        location.pathname === route.to
                                            ? 'bg-muted'
                                            : 'hover:bg-muted'
                                    )}
                                >
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <FolderOpen className="h-6 w-6" />
                        <span className="font-bold">ForAid</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                        {routes.map((route) => (
                            <Link
                                key={route.to}
                                to={route.to}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    location.pathname === route.to
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <form className="hidden lg:block">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar casos..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">
                                    Abrir menú de usuario
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="/casos"
                                    className="flex items-center space-x-2"
                                >
                                    Nuevo caso
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to="/identikits"
                                    className="flex items-center space-x-2"
                                >
                                    Nuevo indentikit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
