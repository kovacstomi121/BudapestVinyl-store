import { Billboard } from "@/types";

// A BillboardProps interfész definiálása
interface BillboardProps {
  data: Billboard;
}

// A Billboard komponens definíciója
const Billboard: React.FC<BillboardProps> = ({ data }) => {
  // Console.log üres parancs (hiba lehet)
  console;

  // A Billboard komponens JSX struktúrája
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      {/* A plakát háttérképének beállítása az adatok imageUrl értéke alapján */}
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        {/* A plakát tartalmának középre igazítása */}
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          {/* A plakát feliratának megjelenítése */}
          <div className="font-bold text-white text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
