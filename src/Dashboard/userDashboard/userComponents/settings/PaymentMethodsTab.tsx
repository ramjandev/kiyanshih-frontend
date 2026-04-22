
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDeletePaymentMethodsMutation, useSetDefaultPaymentMethodMutation } from "@/redux/featuresAPI/userAPI/userProfile.api"
import { toast } from "react-toastify"

const PaymentMethodsTab = () => {
  const [selectedGateway, setSelectedGateway] = useState("mastercard")
  const [showAddCard, setShowAddCard] = useState(false)
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null)
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null)

  const [deletePaymentMethod, { isLoading: isDeleting }] = useDeletePaymentMethodsMutation()
  const [setDefaultPaymentMethod, { isLoading: isSettingDefault }] = useSetDefaultPaymentMethodMutation()

  const savedCards = [
    { id: "1", type: "Visa", last4: "4242", expiry: "15/01/2024", isDefault: true },
    { id: "2", type: "Visa", last4: "4255", expiry: "16/02/2024", isDefault: false },
  ]

  const handleDeleteCard = async (id: string) => {
    try {
      setDeletingCardId(id)
      const res = await deletePaymentMethod({ id }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Payment method deleted successfully")
      }
    } catch (error: any) {
      const errorMessage = error?.data?.detail || "Failed to delete payment method"
      toast.error(errorMessage)
      console.error("Delete error:", error)
    } finally {
      setDeletingCardId(null)
    }
  }

  const handleSetDefault = async (id: string, body: { card_holder_name: string }) => {
    try {
      setSettingDefaultId(id)
      const res = await setDefaultPaymentMethod({
        id,
        body
      }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Default payment method updated successfully")
      }
    } catch (error: any) {
      const errorMessage = error?.data?.detail || "Failed to set default payment method"
      toast.error(errorMessage)
      console.error("Set default error:", error)
    } finally {
      setSettingDefaultId(null)
    }
  }

  const paymentHistory = [
    { id: "1", service: "Kitchen Cabinet Installation", date: "15/02/2024", card: "4255", amount: 20.0 },
    { id: "2", service: "Wedding Photography", date: "15/02/2024", card: "6255", amount: 110.0 },
  ]

  return (
    <div className="space-y-6 pb-10">
      {/* Add New Card Section */}
      {showAddCard && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Book Your Service in Just a Few Clicks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-3 block">Choose Your Payment Gateway:</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="mastercard"
                    checked={selectedGateway === "mastercard"}
                    onCheckedChange={() => setSelectedGateway("mastercard")}
                  />
                  <Label htmlFor="mastercard" className="flex cursor-pointer items-center gap-2">
                    <div className="flex h-8 w-12 items-center justify-center rounded bg-gradient-to-r from-red-500 to-orange-500">
                      <span className="text-xs font-bold text-white">MC</span>
                    </div>
                    Mastercard
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="visa"
                    checked={selectedGateway === "visa"}
                    onCheckedChange={() => setSelectedGateway("visa")}
                  />
                  <Label htmlFor="visa" className="flex cursor-pointer items-center gap-2">
                    <div className="flex h-8 w-12 items-center justify-center rounded bg-blue-600">
                      <span className="text-xs font-bold text-white">VISA</span>
                    </div>
                    Visa card
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="webpay"
                    checked={selectedGateway === "webpay"}
                    onCheckedChange={() => setSelectedGateway("webpay")}
                  />
                  <Label htmlFor="webpay" className="flex cursor-pointer items-center gap-2">
                    <div className="flex h-8 w-12 items-center justify-center rounded border-2 border-gray-300">
                      <span className="text-xs font-bold">WP</span>
                    </div>
                    Web Pay
                  </Label>
                </div>
              </div>
            </div>

            {selectedGateway === "mastercard" && (
              <div className="space-y-4">
                <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                  <span className="text-lg font-bold text-white">MC</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number:</Label>
                  <Input id="card-number" placeholder="0)234 5678 9100" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country:</Label>
                    <Input id="country" placeholder="Enter country" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date:</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC:</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP:</Label>
                    <Input id="zip" placeholder="12345" />
                  </div>
                </div>

                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  Add Card
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Saved Payment Methods */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <CardTitle>Payment Methods</CardTitle>
          <Button
            onClick={() => setShowAddCard(!showAddCard)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer w-full sm:w-auto"
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Payment Gateway
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedCards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-4"
            >
              <div className="flex items-center gap-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-medium">
                      {card.type} ******{card.last4}
                    </span>
                    {card.isDefault && (
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Default</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground text-gray-500">
                    Expire date : {card.expiry}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {!card.isDefault && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto cursor-pointer"
                    onClick={() => handleSetDefault(card.id, { card_holder_name: "John Doe Up" })}
                    disabled={isSettingDefault || settingDefaultId === card.id}
                  >
                    {settingDefaultId === card.id ? "Setting..." : "Set as Default"}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer w-full sm:w-auto"
                  onClick={() => handleDeleteCard(card.id)}
                  disabled={isDeleting || deletingCardId === card.id || card.isDefault}
                  title={card.isDefault ? "Cannot delete default payment method" : "Delete payment method"}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-4"
            >
              <div className="space-y-1">
                <div className="font-medium">{payment.service}</div>
                <div className="text-sm text-muted-foreground text-gray-600">
                  Date : {payment.date} Visa *****{payment.card}
                </div>
              </div>
              <div className="text-lg font-semibold">${payment.amount.toFixed(2)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentMethodsTab;
