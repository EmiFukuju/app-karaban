const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CaravanShare. All rights reserved.</p>
          <p className="mt-2">
            본 사이트는 Next.js 포트폴리오를 위해 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
