import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Trash2, File, FolderOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const documents = [
  { name: 'Rental Agreement.pdf', type: 'Template', date: '2 Mar 2026', size: '245 KB' },
  { name: 'Legal Notice Draft.docx', type: 'Generated', date: '28 Feb 2026', size: '128 KB' },
  { name: 'Property Documents.pdf', type: 'Uploaded', date: '25 Feb 2026', size: '1.2 MB' },
  { name: 'Consumer Complaint.pdf', type: 'Generated', date: '20 Feb 2026', size: '98 KB' },
];

const typeColors: Record<string, string> = {
  Template: 'bg-blue-100 text-blue-700 border-blue-200',
  Generated: 'bg-purple-100 text-purple-700 border-purple-200',
  Uploaded: 'bg-green-100 text-green-700 border-green-200',
};

const DocumentsSection = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <CardTitle className="text-lg flex items-center gap-2">
        <FolderOpen className="h-4 w-4" /> Documents & Templates
      </CardTitle>
      <Button size="sm" variant="outline" onClick={() => toast({ title: 'Upload', description: 'File upload feature coming soon.' })}>
        <Upload className="h-3.5 w-3.5 mr-1" /> Upload
      </Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {documents.map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <File className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.date} · {doc.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className={`text-xs ${typeColors[doc.type] || ''}`}>{doc.type}</Badge>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default DocumentsSection;
