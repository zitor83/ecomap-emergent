// Estilos
const wrapper = "bg-themeBg px-4 pb-4 w-full"
const title = "text-2xl font-bold text-themePrimary"

// Componente
export default function  FavoritesTitle() {
    return (
        <div className={wrapper}>
            <h1 className={title} data-testid="favorites-title">Favoritos</h1>
        </div>
    )
}
