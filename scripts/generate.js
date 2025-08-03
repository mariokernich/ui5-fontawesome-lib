const fs = require("fs");
const path = require("path");

const faRoot = path.resolve(
	__dirname,
	"../node_modules/@fortawesome/fontawesome-free"
);
const targetRoot = path.resolve(__dirname, "../src/fonts");

const copy = (src, dest) => {
	console.log("Copying " + src + " to " + dest);
	const targetPath = path.resolve(__dirname, targetRoot + dest);
	const targetDirectoryPath = path.dirname(targetPath);

	if (!fs.existsSync(targetDirectoryPath)) {
		fs.mkdirSync(targetDirectoryPath, { recursive: true });
	}

	fs.copyFile(path.resolve(__dirname, faRoot + src), targetPath, (err) => {
		if (err) {
			console.error("❌ Failed to copy from " + src + " to " + targetPath + " with error: " + err);
			process.exit(1);
		}
	});
};

const families = require("@fortawesome/fontawesome-free/metadata/icon-families.json");

const fetchFont = (options) => {
	const icons = {};
	for (const key in families) {
		const icon = families[key];
		if (icon.familyStylesByLicense.free) {
			icon.familyStylesByLicense.free.forEach((family) => {
				if (family.family === "classic" && family.style === options.style) {
					icons[key] = icon.unicode;
				}
			});
		}
		if (icon.familyStylesByLicense.pro) {
			icon.familyStylesByLicense.pro.forEach((family) => {
				if (family.family === "classic" && family.style === options.style) {
					icons[key] = icon.unicode;
				}
			});
		}
	}

	copy(
		`/webfonts/${options.name}-${options.weight}.woff2`,
		`/${options.name}/${options.name}.woff2`
	);
	copy("/LICENSE.txt", `/${options.name}/LICENSE.txt`);

	fs.writeFile(
		path.resolve(
			__dirname,
			`${targetRoot}/${options.name}/${options.name}.json`
		),
		JSON.stringify(icons),
		(err) => {
			if (err) {
				console.log(err);
			}
		}
	);
};

fetchFont({
	name: "fa-solid",
	style: "solid",
	weight: 900,
});
fetchFont({
	name: "fa-regular",
	style: "regular",
	weight: 400,
});
fetchFont({
	name: "fa-brands",
	style: "brands",
	weight: 400,
});

/*
uncomment to generate light and thin fonts from pro version
fetchFont({
    name: "fa-light",
    style: "light",
    weight: 300,
});
fetchFont({
    name: "fa-thin",
    style: "thin",
    weight: 100,
});
*/