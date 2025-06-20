import PartList from "../features/parts/PartList";

export default function PartsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold p-4 text-center">Каталог запчастей</h1>
            <PartList />
        </div>
    );
}
