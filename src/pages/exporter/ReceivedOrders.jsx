import React from "react";

const ReceivedOrders = ({ orders, onAccept, onShip, onDeliver }) => {
  console.log(orders);
  
  return (
    <div className="space-y-6">
      {orders.map(order => {
        let nextAction = null;

        // Determine next action based on status
        switch (order.status) {
          case "PENDING":
            nextAction = { label: "Accept", handler: () => onAccept(order.tradeId), color: "green" };
            break;
          case "VERIFIED": // Bank transfer done → ready to ship
            nextAction = { label: "Ship", handler: () => onShip(order.tradeId), color: "blue" };
            break;
          case "SHIPPED":
            nextAction = { label: "Deliver", handler: () => onDeliver(order.tradeId), color: "purple" };
            break;
          default:
            nextAction = null; // DELIVERED or any final state
        }

        return (
          <div key={order.tradeId} className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-semibold">{order.productName}</h4>
            <p>Importer: {order.importerName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: {order.totalAmount}</p>
            <p>Status: {order.status}</p>

            {nextAction && (
              <button
                onClick={nextAction.handler}
                className={`mt-3 px-3 py-1 rounded text-white bg-${nextAction.color}-600 hover:bg-${nextAction.color}-700`}
              >
                {nextAction.label}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReceivedOrders;