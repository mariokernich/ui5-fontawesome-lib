import Button from "sap/m/Button";
import Column from "sap/m/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import Label from "sap/m/Label";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import Page from "sap/m/Page";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Text from "sap/m/Text";
import Title from "sap/m/Title";
import Icon from "sap/ui/core/Icon";
import JSONModel from "sap/ui/model/json/JSONModel";

const searchField = new SearchField({
	placeholder: "Search icons...",
	width: "300px",
	value: "",
	liveChange: (event: any) => {
		const searchTerm = event.getParameter("newValue").toLowerCase();
		const tables = document.querySelectorAll("table");

		tables.forEach((tableElement: any) => {
			const rows = tableElement.querySelectorAll("tr");
			rows.forEach((row: any) => {
				const cells = row.querySelectorAll("td");
				if (cells.length > 0) {
					const iconName = cells[1]?.textContent?.toLowerCase() || "";
					const iconPath = cells[2]?.textContent?.toLowerCase() || "";
					const matches = searchTerm === "" || iconName.includes(searchTerm) || iconPath.includes(searchTerm);
					row.style.display = matches ? "" : "none";
				}
			});
		});
	}
})

const page = new Page({
	title: "Font Awesome Icons UI5 integration",
	headerContent: [
		new Button({
			text: "NPM Package",
			type: "Transparent",
			icon: "sap-icon://fa-brands/npm",
			press: () => {
				window.open("https://www.npmjs.com/package/ui5-fontawesome-library", "_blank");
			}
		}),
		new Button({
			text: "GitHub Repository",
			type: "Transparent",
			icon: "sap-icon://fa-brands/github",
			press: () => {
				window.open("https://github.com/mariokernich/ui5-fontawesome-library", "_blank");
			}
		}),
		searchField,

	],
	content: [
		new Title({ text: "Font Awesome Icons" }),
	],
});

page.placeAt("content");

const showPack = async (iconPack: string) => {
	const url = sap.ui.require.toUrl(
		"fontawesome/icons/library/fonts/" + iconPack + "/" + iconPack + ".json"
	);
	const model = new JSONModel();

	await model.loadData(url);
	const icons = model.getData() as Record<string, { key: string }>[];

	new Title({ text: iconPack }).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginTop sapUiSmallMarginEnd").placeAt("content");

	const table = new Table({
		columns: [
			new Column({
				header: new Label({ text: "Icon" }),
				width: "50px",
			}),
			new Column({
				header: new Label({ text: "Name" }),
			}),
			new Column({
				header: new Label({ text: "Icon Path" }),
			}),
			new Column({
				header: new Label({ text: "Action" }),
				width: "100px",
				hAlign: "Right",
			}),
		],
	});

	for (const key of Object.keys(icons)) {
		const src = "sap-icon://" + iconPack + "/" + key;
		const iconControl = new Icon({
			src: src,
			size: "2rem",
		});

		const copyButton = new Button({
			icon: "sap-icon://fa-regular/copy",
			type: "Transparent",
			tooltip: "Copy icon path to clipboard",
			press: () => {
				navigator.clipboard.writeText(src).then(() => {
					MessageToast.show("Icon path copied to clipboard!");
				}).catch(() => {
					MessageBox.error("Failed to copy to clipboard");
				});
			}
		});

		const listItem = new ColumnListItem({
			cells: [
				iconControl,
				new Text({ text: key }),
				new Text({ text: src }),
				copyButton
			],
		});
		table.addItem(listItem);
	}

	table.addStyleClass("sapUiSmallMargin");
	table.setWidth("calc(100% - 2rem)");

	table.placeAt("content");
};

const init = async () => {
	await showPack("fa-regular");
	await showPack("fa-solid");
	await showPack("fa-brands");

	searchField.focus()
};

void init();
