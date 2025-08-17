import OrdersList from "./_components/OrdersList";

const MyOrdersPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      <OrdersList />
    </div>
  );
};

export default MyOrdersPage;
