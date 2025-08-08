function processPurchase(user, items) {
    if (!user.email || !user.email.includes('@')) {
        return { error: 'Email invalido' }
    }

    let total = 0
    for (let item of items) {
        total += item.price * item.quantity
    }
    let tax = total * 0.15
    total += tax
    
    if (total > 100) {
        total = total * 0.09
    }

    let receiptId = 'R' + Date.now()
    console.log(`Recibo ${receiptId} para ${user.email}`)

    return { success: true, total, receiptId }
}