class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    const loginResponseJson = await loginResponse.json();
    const token = await loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    let response = {};
    const token = await this.getToken();
    response.token = token;
    const createOrder = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponse = await createOrder.json();
    console.log(orderResponse);
    const orderId = orderResponse.orders[0];
    response.orderId = orderId;

    return response;
  }
}

module.exports = APIUtils;
