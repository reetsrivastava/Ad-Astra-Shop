function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export async function displayRazorpay() {
    try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    const data = await fetch('https://razorpay-api.reetrs.repl.co/razorpay', { method: 'POST' }).then((t) =>
        t.json()
    )

    console.log(data)

    const options = {
        key: 'rzp_test_1p0T28xkIq1iPc',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Astra Corporation',
        description: 'Pay the Order Amount',
        handler: function (response) {
            console.log(response)
            console.log(response.razorpay_payment_id)
            console.log(response.razorpay_order_id)
            console.log(response.razorpay_signature)
        },
        prefill: {
            name: "Reet",
            email: 'sdfdsjfh2@ndsfdf.com',
            phone_number: '9899999999'
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    } catch (e) {
        console.log(e);
    }
}