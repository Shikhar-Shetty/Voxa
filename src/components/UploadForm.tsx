'use client';

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from "next/image";

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
        const [imageUrl, setImageUrl] = useState<string>("");

    const handleImageUpload = async () => {
        if(!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        const data = await res.json();
        console.log('Uploaded File:', data.fileUrl);

        setImageUrl(data.fileUrl);
    }


  return (
        <div className="p-4 space-y-4 max-w-md mx-auto border rounded-lg">
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <Button onClick={handleImageUpload}>Upload Image</Button>

            {imageUrl && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm text-green-600">Image uploaded successfully:</p>
                    <Image src={imageUrl} alt="Uploaded Preview" className="w-full h-auto rounded-md" />
                </div>
            )}
        </div>
    );

}