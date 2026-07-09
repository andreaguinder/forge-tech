import React from "react";

export const Banners = ({ items, renderItem, containerClassName }) => {

    return (
        <div className={containerClassName}>
            {items.map((item, index) => (
                <div key={item.id || index}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )

}

