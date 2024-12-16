function Page({ Title, children }) {
    return (
        <>
            <div class="bg-white-500 w-3/4 h-auto mx-auto rounded-xl shadow-sm mb-2">
                <h1 class="text-2xl font-bold text-center">{Title}</h1>
                {children}
            </div>
        </>
    );
}

export default Page;