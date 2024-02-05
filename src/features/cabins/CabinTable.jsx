import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();

  //filter
  let filteredCabins;
  if (searchParams.get("discount") === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => {
      return cabin.discount === 0;
    });
  } else if (searchParams.get("discount") === "with-discount") {
    filteredCabins = cabins?.filter((cabins) => cabins.discount > 0);
  } else {
    filteredCabins = cabins;
  }

  //sort
  let sortedCabins;
  const sortBy = searchParams.get("sort");
  if (filteredCabins)
    switch (sortBy) {
      case "name-asc":
        filteredCabins.sort((a, b) => (a.name < b.name ? -1 : 1));
        break;
      case "name-desc":
        filteredCabins.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      case "regularPrice-asc":
        filteredCabins.sort((a, b) =>
          a.regularPrice < b.regularPrice ? -1 : 1
        );
        break;
      case "regularPrice-desc":
        filteredCabins.sort((a, b) =>
          a.regularPrice > b.regularPrice ? -1 : 1
        );
        break;
      case "capacity-asc":
        filteredCabins.sort((a, b) => (a.maxCapacity < b.maxCapacity ? -1 : 1));
        console.log(filteredCabins);
        break;
      case "capacity-desc":
        filteredCabins.sort((a, b) => (a.maxCapacity > b.maxCapacity ? -1 : 1));
        console.log(filteredCabins);
        break;
    }

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
