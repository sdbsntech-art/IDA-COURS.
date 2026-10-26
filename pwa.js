(() => {
    const installButton = document.createElement("button");
    installButton.className = "pwa-install-button";
    installButton.type = "button";
    installButton.textContent = "Installer SDBSN Codes";
    installButton.hidden = true;
    installButton.setAttribute("aria-label", "Installer SDBSN Codes sur cet appareil");
    document.body.append(installButton);

    const networkStatus = document.createElement("p");
    networkStatus.className = "pwa-network-status";
    networkStatus.setAttribute("role", "status");
    networkStatus.setAttribute("aria-live", "polite");
    networkStatus.hidden = true;
    document.body.append(networkStatus);

    let installPrompt;

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        installButton.hidden = false;
    });

    installButton.addEventListener("click", async () => {
        if (!installPrompt) return;

        installButton.disabled = true;
        await installPrompt.prompt();
        await installPrompt.userChoice;
        installPrompt = null;
        installButton.hidden = true;
        installButton.disabled = false;
    });

    window.addEventListener("appinstalled", () => {
        installPrompt = null;
        installButton.hidden = true;
    });

    const updateNetworkStatus = () => {
        networkStatus.textContent = navigator.onLine
            ? ""
            : "Vous êtes hors ligne. Les pages déjà visitées restent disponibles.";
        networkStatus.hidden = navigator.onLine;
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    updateNetworkStatus();

    if ("serviceWorker" in navigator && window.isSecureContext) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js").catch((error) => {
                console.warn("L'enregistrement du mode hors ligne a échoué.", error);
            });
        });
    }
})();
