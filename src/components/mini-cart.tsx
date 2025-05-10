"use client"

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, X, Coins, Store, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentModal } from "@/components/payment-modal";
import { useCart } from "@/contexts/cart-context";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";

export function MiniCart() {
    const { items, removeItem, updateQuantity, total } = useCart();
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    const cashbackThreshold = 100;
    const cashbackPercentage = 5;
    const progress = Math.min((total / cashbackThreshold) * 100, 100);
    const potentialCashback = (total * (cashbackPercentage / 100)).toFixed(2);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#097bff]">
                            {items.length}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-[400px] sm:max-w-md">
                <SheetHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
                    <SheetTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-[#097bff]" />
                        <span className="bg-gradient-to-r from-[#097bff] to-blue-700 bg-clip-text text-transparent">
                            Meu Carrinho
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-500">
                            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4">
                                <ShoppingCart className="h-12 w-12 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-lg">Seu carrinho está vazio</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Adicione produtos para continuar comprando</p>
                            </div>
                            <Button variant="outline" className="mt-2 gap-2">
                                <Store className="h-4 w-4" />
                                Explorar Produtos
                            </Button>
                        </div>
                    ) : (
                        <AnimatePresence>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 overflow-hidden hover:border-[#097bff]/20 dark:hover:border-[#097bff]/20 transition-all"
                                    >
                                        <div className="flex gap-3 p-3">
                                            <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name || item.title}
                                                        className="object-cover h-full w-full transition-transform group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                        <ShoppingCart className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1 min-w-0">
                                                        <h3 className="font-poppins font-medium text-gray-900 dark:text-gray-100 line-clamp-1 text-sm">
                                                            {item.name || item.title}
                                                        </h3>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-sm font-semibold text-[#097bff] dark:text-blue-400">
                                                                {formatCurrency(item.price)}
                                                            </span>
                                                            {item.quantity > 1 && (
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    x{item.quantity}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {item.description && item.description !== `SKU: ${item.sku}` && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                        aria-label="Remover item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-full"
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="h-7 w-12 px-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-full"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                    <div className="ml-auto text-xs font-medium text-gray-900 dark:text-gray-100">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    )}
                </div>

                {items.length > 0 && (
                    <SheetFooter className="border-t border-gray-100 dark:border-gray-800 pt-4 flex-col">
                        <div className="w-full space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between font-medium">
                                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                                    <span className="text-lg text-[#097bff] dark:text-blue-400">{formatCurrency(total)}</span>
                                </div>
                            </div>

                            {progress < 100 && (
                                <div className="space-y-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                            Faltam {formatCurrency(cashbackThreshold - total)} para {cashbackPercentage}% de cashback
                                        </span>
                                        <span className="text-[#097bff] dark:text-blue-400 font-semibold">
                                            {formatCurrency(parseFloat(potentialCashback))}
                                        </span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            )}

                            <Button
                                className="w-full bg-[#097bff] hover:bg-[#097bff]/90 gap-2 py-6 text-base font-medium"
                                onClick={() => setPaymentModalOpen(true)}
                            >
                                Finalizar Compra
                                <Coins className="w-4 h-4" />
                            </Button>
                        </div>
                    </SheetFooter>
                )}

                <PaymentModal
                    open={paymentModalOpen}
                    onClose={() => setPaymentModalOpen(false)}
                    product={{
                        id: items[0]?.id,
                        price: total,
                        name: items.length === 1 ? items[0].name : `Carrinho com ${items.length} itens`
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
