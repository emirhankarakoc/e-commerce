import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

const Breadcrumblar: React.FC<BreadcrumblarProps> = ({
  category,
  brandName,
  modelName,
}) => {
  return (
    <div className="p-10 mx-14">
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Catalog</BreadcrumbItem>
        <BreadcrumbItem>{category}</BreadcrumbItem>
        {brandName && <BreadcrumbItem>{brandName}</BreadcrumbItem>}
        {brandName && modelName && <BreadcrumbItem>{modelName}</BreadcrumbItem>}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumblar;
