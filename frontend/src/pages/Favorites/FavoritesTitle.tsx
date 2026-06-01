// Estilos
const wrapper = "bg-themeBg w-full px-4 pt-4 pb-2 flex justify-center"
const title = "text-center text-3xl sm:text-4xl font-extrabold text-themePrimary border-b-4 border-themePrimary pb-2 tracking-tight"

// Componente
export default function  FavoritesTitle() {
    return (
        <div className={wrapper}>
            <h1 className={title} data-testid="favorites-title">Favoritos</h1>
        </div>
    )
}
