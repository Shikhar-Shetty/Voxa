'use client';

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from "next/image";

export default function UploadForm({ setImage }: { setImage: (url: string) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleImageUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log('Uploaded File:', data.fileUrl);

        setPreviewUrl(data.fileUrl);
        setImage(data.fileUrl); 
    };

    return (
        <div className="p-2 space-y-2 border rounded-md">
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <Button onClick={handleImageUpload}>Upload Image</Button>

            {previewUrl && (
                <div className="mt-2">
                    <p className="text-sm text-green-600">Image uploaded successfully:</p>
                    <Image src={previewUrl} alt="Uploaded Preview" width={200} height={200} className="rounded-md" />
                </div>
            )}
        </div>
    );
}
