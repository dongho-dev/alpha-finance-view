import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Save, X } from "lucide-react";

interface EditableCardProps {
  title: string;
  content: string;
  onSave: (content: string) => void;
  isTextArea?: boolean;
  placeholder?: string;
}

export function EditableCard({ 
  title, 
  content, 
  onSave, 
  isTextArea = false, 
  placeholder = "내용을 입력하세요..." 
}: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    onSave(editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            {isTextArea ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder={placeholder}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder={placeholder}
              />
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                저장
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-1" />
                취소
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
            {content || placeholder}
          </div>
        )}
      </CardContent>
    </Card>
  );
}